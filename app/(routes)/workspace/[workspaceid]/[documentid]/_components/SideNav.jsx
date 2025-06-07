"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import NotificationBox from "./NotificationBox";

const MAX_FILE = 5;

function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const [resolvedParams, setResolvedParams] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (
      resolvedParams?.workspaceid &&
      resolvedParams.workspaceid !== "undefined"
    ) {
      GetDocumentList();
    }
  }, [resolvedParams]);

  /**
   * Used to get Document List
   */
  const GetDocumentList = () => {
    if (
      !resolvedParams?.workspaceid ||
      resolvedParams.workspaceid === "undefined"
    ) {
      console.error("Invalid workspace ID:", resolvedParams?.workspaceid);
      return;
    }

    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(resolvedParams.workspaceid))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]);

      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
  };

  /**
   * Create New Document
   */
  const CreateNewDocument = async () => {
    if (
      !resolvedParams?.workspaceid ||
      resolvedParams.workspaceid === "undefined"
    ) {
      toast.error("Invalid workspace ID");
      return;
    }

    if (documentList?.length >= MAX_FILE) {
      toast("Upgrade to add new file", {
        description:
          "You reach max file, Please upgrad for unlimited file creation",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    setLoading(true);
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(resolvedParams.workspaceid),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });

    setLoading(false);
    router.replace("/workspace/" + resolvedParams.workspaceid + "/" + docId);
  };

  // Don't render until params are resolved
  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="h-screen md:w-72 
    hidden md:block fixed bg-blue-50 p-5 shadow-md"
    >
      <div className="flex justify-between items-center">
        <Logo />
        <NotificationBox>
          <Bell className="h-5 w-5 text-gray-500" />
        </NotificationBox>
      </div>
      <hr className="my-5"></hr>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Workspace Name</h2>
          <Button size="sm" className="text-lg" onClick={CreateNewDocument}>
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>

      {/* Document List  */}
      <DocumentList documentList={documentList} params={resolvedParams} />

      {/* Progress Bar  */}

      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList?.length}</strong> Out of <strong>5</strong>{" "}
          files used
        </h2>
        <h2 className="text-sm font-light ">
          Upgrade your plan for unlimted access
        </h2>
      </div>
    </div>
  );
}

export default SideNav;
