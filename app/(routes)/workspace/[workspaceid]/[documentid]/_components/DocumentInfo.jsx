"use client";

import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SmilePlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function DocumentInfo({ params }) {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [emoji, setEmoji] = useState();
  const [documentInfo, setDocumentInfo] = useState();
  const [resolvedParams, setResolvedParams] = useState(null);

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const awaitedParams = await params;
        // console.log("Resolved params:", awaitedParams);
        setResolvedParams(awaitedParams);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    if (params) {
      resolveParams();
    }
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.documentid) {
      GetDocumentInfo();
    }
  }, [resolvedParams]);

  /**
   * Used to get document info
   */
  const GetDocumentInfo = async () => {
    if (!resolvedParams?.documentid) {
      console.warn("No document ID provided");
      return;
    }

    const docRef = doc(db, "workspaceDocuments", resolvedParams?.documentid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setDocumentInfo(docSnap.data());
      setEmoji(docSnap.data()?.emoji);
      docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage);
    }
  };

  const updateDocumentInfo = async (key, value) => {
    // Safety check - ensure we have required data
    if (!resolvedParams?.documentid) {
      console.warn("Cannot update document: No document ID");
      return;
    }

    const docRef = doc(db, "workspaceDocuments", resolvedParams?.documentid);
    await updateDoc(docRef, {
      [key]: value,
    });
    toast("Document Updated!");
  };

  // Don't render until params are resolved
  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Cover  */}
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo("coverImage", cover);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2
            className="hidden absolute p-4 w-full h-full
                    items-center group-hover:flex
                    justify-center  "
          >
            Change Cover
          </h2>
          <div className="group-hover:opacity-40">
            <Image
              src={coverImage}
              alt="cover"
              width={400}
              height={400}
              className="w-full h-[200px] object-cover "
            />
          </div>
        </div>
      </CoverPicker>
      {/* Emoji Picker  */}
      <div className="absolute ml-10 px-20 mt-[-40px] cursor-pointer">
        <EmojiPickerComponent
          setEmojiIcon={(emoji) => {
            setEmoji(emoji);
            updateDocumentInfo("emoji", emoji);
          }}
        >
          <div className="bg-[#ffffffb0] p-4 rounded-md">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <SmilePlus className="h-10 w-10 text-gray-500" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>
      {/* File Name  */}
      <div className="mt-10 px-20 ml-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="font-bold text-4xl outline-none"
          onBlur={(event) =>
            updateDocumentInfo("documentName", event.target.value)
          }
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
