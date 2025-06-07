"use client";

import { useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }) {
  const [resolvedParams, setResolvedParams] = useState(null);

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

  // Don't render until params are resolved and documentid exists
  if (
    !resolvedParams?.documentid ||
    resolvedParams.documentid === "undefined"
  ) {
    return <div>Loading...</div>;
  }

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth?roomId=" + resolvedParams.documentid}
      resolveUsers={async ({ userIds }) => {
        const q = query(
          collection(db, "KolabUsers"),
          where("email", "in", userIds)
        );
        const querySnapshot = await getDocs(q);
        const userList = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          userList.push(doc.data());
        });
        return userList;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const q = query(
          collection(db, "KolabUsers"),
          where("email", "!=", null)
        );
        const querySnapshot = await getDocs(q);
        let userList = [];
        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        console.log(userList);

        if (text) {
          userList = userList.filter((user) => user.name.includes(text));
        }
        console.log(userList.map((user) => user.email));

        return userList.map((user) => user.email);
      }}
    >
      <RoomProvider id={resolvedParams.documentid}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
