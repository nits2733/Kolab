"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
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
  const [workspaceName, setWorkspaceName] = useState("Workspace");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const awaitedParams = await params;
        setResolvedParams(awaitedParams);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    if (params) {
      resolveParams();
    }
  }, [params]);

  // Fetch workspace name from Firestore
  useEffect(() => {
    const fetchWorkspaceName = async () => {
      if (resolvedParams?.workspaceid) {
        try {
          const workspaceRef = doc(db, "Workspace", resolvedParams.workspaceid);
          const workspaceSnap = await getDoc(workspaceRef);
          if (workspaceSnap.exists()) {
            setWorkspaceName(workspaceSnap.data().workspaceName || "Workspace");
          }
        } catch (err) {
          console.error("Error fetching workspace name:", err);
        }
      }
    };

    fetchWorkspaceName();
  }, [resolvedParams]);

  // Get list of documents in workspace
  useEffect(() => {
    if (
      resolvedParams?.workspaceid &&
      resolvedParams.workspaceid !== "undefined"
    ) {
      GetDocumentList();
    }
  }, [resolvedParams]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(resolvedParams.workspaceid))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setDocumentList(docs);
    });
  };

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
          "You reached max file limit. Please upgrade for unlimited file creation.",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Upgrade clicked"),
        },
      });
      return;
    }

    setLoading(true);
    const docId = uuid4();

    await setDoc(doc(db, "workspaceDocuments", docId), {
      workspaceId: Number(resolvedParams.workspaceid),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId), {
      docId: docId,
      output: [],
    });

    setLoading(false);
    router.replace(`/workspace/${resolvedParams.workspaceid}/${docId}`);
  };

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <Logo />
        <NotificationBox>
          <Bell className="h-5 w-5 text-gray-500" />
        </NotificationBox>
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium truncate" title={workspaceName}>
            {workspaceName}
          </h2>
          <Button size="sm" className="text-lg" onClick={CreateNewDocument}>
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>

      {/* Document List */}
      <DocumentList documentList={documentList} params={resolvedParams} />

      {/* Progress Bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList?.length}</strong> out of <strong>5</strong>{" "}
          files used
        </h2>
        <h2 className="text-sm font-light">
          Upgrade your plan for unlimited access
        </h2>
      </div>
    </div>
  );
}

export default SideNav;
