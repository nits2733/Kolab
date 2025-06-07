"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import SimpleImage from "simple-image-editorjs";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import Paragraph from "@editorjs/paragraph";
import GenerateAITemplate from "./GenerateAITemplate";

function RichDocumentEditor({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const ref = useRef();
  let editor;
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  let isFetched = false;

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const awaited = await params;
        setResolvedParams(awaited);
      } catch (err) {
        console.error("Error resolving params:", err);
      }
    };

    if (params) {
      resolveParams();
    }
  }, [params]);

  useEffect(() => {
    user && resolvedParams && InitEditor();
  }, [user, resolvedParams]);

  const SaveDocument = () => {
    console.log("UPDATE");
    ref.current.save().then(async (outputData) => {
      // Validate and clean the output data
      if (outputData && outputData.blocks) {
        // Filter out invalid blocks
        const validBlocks = outputData.blocks.filter((block) => {
          if (block.type === "paragraph") {
            return block.data && typeof block.data.text === "string";
          }
          return true;
        });

        const cleanedOutput = {
          ...outputData,
          blocks: validBlocks,
        };

        const docRef = doc(db, "documentOutput", resolvedParams?.documentid);
        await updateDoc(docRef, {
          output: JSON.stringify(cleanedOutput),
          editedBy: user?.primaryEmailAddress?.emailAddress,
        });
      }
    });
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(
      doc(db, "documentOutput", resolvedParams?.documentid),
      (doc) => {
        try {
          if (
            doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress ||
            isFetched == false
          ) {
            if (doc.data()?.output && doc.data().editedBy) {
              editor?.render(JSON.parse(doc.data()?.output));
            }
          }
          isFetched = true;
        } catch (error) {
          console.error("Error rendering document:", error);
        }
      }
    );
  };

  const InitEditor = () => {
    if (!editor?.current) {
      editor = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          paragraph: Paragraph,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+L",
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            shortcut: "CMD+SHIFT+C",
            inlineToolbar: true,
          },
          image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: "CMD+SHIFT+P",
          },
        },
      });
      ref.current = editor;
    }
  };

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" ">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAITemplate
          setGenerateAIOutput={async (output) => {
            if (editor && output && output.blocks) {
              try {
                // Get current content
                const currentData = await editor.save();

                // Combine existing blocks with new template blocks
                const combinedData = {
                  time: Date.now(),
                  blocks: [...currentData.blocks, ...output.blocks],
                  version: output.version || "2.27.0",
                };

                // Render the combined content
                await editor.render(combinedData);
              } catch (error) {
                console.error("Error adding template:", error);
                // Fallback: just render the template
                editor.render(output);
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
