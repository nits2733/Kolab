"use client";

import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import GenerateAITemplate from "./GenerateAITemplate";

function RichDocumentEditor({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef(null);
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  let isFetched = false;

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (user && resolvedParams && isClient) {
      InitEditor();
    }

    // Cleanup function
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [user, resolvedParams, isClient]);

  const SaveDocument = () => {
    console.log("UPDATE");
    if (editorRef.current) {
      editorRef.current.save().then(async (outputData) => {
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
    }
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
            if (
              doc.data()?.output &&
              doc.data().editedBy &&
              editorRef.current
            ) {
              editorRef.current.render(JSON.parse(doc.data()?.output));
            }
          }
          isFetched = true;
        } catch (error) {
          console.error("Error rendering document:", error);
        }
      }
    );
  };

  const InitEditor = async () => {
    if (!editorRef.current && typeof window !== "undefined") {
      try {
        // Dynamic imports to ensure client-side only loading
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Delimiter = (await import("@editorjs/delimiter")).default;
        const Alert = (await import("editorjs-alert")).default;
        const List = (await import("@editorjs/list")).default;
        const Checklist = (await import("@editorjs/checklist")).default;
        const SimpleImage = (await import("simple-image-editorjs")).default;
        const Table = (await import("@editorjs/table")).default;
        const CodeTool = (await import("@editorjs/code")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;

        const editor = new EditorJS({
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
        editorRef.current = editor;
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    }
  };

  if (!resolvedParams || !isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" ">
      <div id="editorjs" className="w-[70%]"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAITemplate
          setGenerateAIOutput={async (output) => {
            if (editorRef.current && output && output.blocks) {
              try {
                // Get current content
                const currentData = await editorRef.current.save();

                // Combine existing blocks with new template blocks
                const combinedData = {
                  time: Date.now(),
                  blocks: [...currentData.blocks, ...output.blocks],
                  version: output.version || "2.27.0",
                };

                // Render the combined content
                await editorRef.current.render(combinedData);
              } catch (error) {
                console.error("Error adding template:", error);
                // Fallback: just render the template
                editorRef.current.render(output);
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
