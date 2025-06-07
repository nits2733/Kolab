"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

// Create a separate component that uses Liveblocks hooks
// This will only be rendered when we know we're in a Liveblocks context
function LiveblocksNotifications({ onNotificationsLoaded }) {
  // Import and use hooks here - using non-suspense version to match comment box
  const {
    useInboxNotifications,
    useUnreadInboxNotificationsCount,
    useUpdateRoomNotificationSettings,
  } = require("@liveblocks/react");

  const { inboxNotifications = [] } = useInboxNotifications();
  const { count = 0 } = useUnreadInboxNotificationsCount();
  const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();

  // Set up notification settings to receive all thread notifications
  useEffect(() => {
    if (updateRoomNotificationSettings) {
      updateRoomNotificationSettings({ threads: "all" });
      console.log("Notification settings updated");
    }
  }, [updateRoomNotificationSettings]);

  // Pass data back to parent
  useEffect(() => {
    onNotificationsLoaded(inboxNotifications, count);
    console.log("Notifications count:", count);
  }, [inboxNotifications, count, onNotificationsLoaded]);

  if (inboxNotifications.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <InboxNotificationList>
      {inboxNotifications.map((inboxNotification) => (
        <InboxNotification
          key={inboxNotification.id}
          inboxNotification={inboxNotification}
        />
      ))}
    </InboxNotificationList>
  );
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main component
function NotificationBox({ children }) {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [hasLiveblocks, setHasLiveblocks] = useState(false);

  // Callback to receive notifications data from child component
  const handleNotificationsLoaded = useCallback(
    (notifications, notificationCount) => {
      setCount(notificationCount);
      setHasLiveblocks(true);
    },
    []
  );

  // Only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple bell icon without notifications when not client-side
  if (!isClient) {
    return <div className="flex gap-1">{children}</div>;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1">
          {children}
          {hasLiveblocks && count > 0 && (
            <span className="p-1 px-2 -ml-3 rounded-full text-[7px] bg-primary text-white">
              {count}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[500px]">
        {isClient && (
          <ErrorBoundary
            fallback={
              <div className="p-4 text-center text-muted-foreground">
                Notifications unavailable
              </div>
            }
          >
            <LiveblocksNotifications
              onNotificationsLoaded={handleNotificationsLoaded}
            />
          </ErrorBoundary>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationBox;
