
"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  Bell,
  CheckCheck,
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  Megaphone,
  MoreHorizontal,
  ThumbsUp,
  UserRoundPlus,
} from "lucide-react";

type NotificationType =
  | "like"
  | "comment"
  | "follow"
  | "mention"
  | "connection"
  | "post";

interface Notification {
  id: number;
  type: NotificationType;
  name: string;
  username?: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
  action?: "follow" | "accept";
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    name: "Rahul Sharma",
    username: "@rahulsharma",
    message: "liked your post.",
    time: "5 min",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    name: "Priya Singh",
    username: "@priyasingh",
    message: 'commented: "Amazing project! 🔥"',
    time: "15 min",
    avatar: "https://i.pravatar.cc/150?img=32",
    unread: true,
  },
  {
    id: 3,
    type: "follow",
    name: "Aman Verma",
    username: "@amanverma",
    message: "started following you.",
    time: "30 min",
    avatar: "https://i.pravatar.cc/150?img=15",
    unread: true,
    action: "follow",
  },
  {
    id: 4,
    type: "connection",
    name: "Neha Gupta",
    username: "@nehagupta",
    message: "wants to connect with you.",
    time: "1 hour",
    avatar: "https://i.pravatar.cc/150?img=47",
    unread: true,
    action: "accept",
  },
  {
    id: 5,
    type: "mention",
    name: "Vikas Kumar",
    username: "@vikaskumar",
    message: "mentioned you in a comment.",
    time: "2 hours",
    avatar: "https://i.pravatar.cc/150?img=52",
    unread: false,
  },
  {
    id: 6,
    type: "post",
    name: "Web Development",
    message: "created a new post you may like.",
    time: "3 hours",
    avatar: "https://i.pravatar.cc/150?img=68",
    unread: false,
  },
];

 


     

    const handleResize = (): void => {
        checkWindowSize(window.innerWidth);
    }; 

    const checkWindowSize = (width: number): void => {
        setWidth(width < 1024 ? { width: '100%' } : { maxWidth: '608px' });
    }; 

    useEffect(() => {

        checkWindowSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {

            window.removeEventListener('resize', handleResize);
        };
    }, []);



const getNotificationIcon = (type: NotificationType) => {
  const iconProps = {
    size: 13,
    strokeWidth: 2.5,
  };

  switch (type) {
    case "like":
      return <Heart {...iconProps} />;

    case "comment":
      return <MessageCircle {...iconProps} />;

    case "follow":
      return <UserPlus {...iconProps} />;

    case "mention":
      return <AtSign {...iconProps} />;

    case "connection":
      return <UserRoundPlus {...iconProps} />;

    case "post":
      return <Megaphone {...iconProps} />;

    default:
      return <Bell {...iconProps} />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        py: {
          xs: 0,
          sm: 4,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          px: {
            xs: 0,
            sm: 2,
          },
        }}
      >
        {/* Notification Card */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            border: {
              xs: "none",
              sm: "1px solid #e5e7eb",
            },
            borderRadius: {
              xs: 0,
              sm: "14px",
            },
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Stack
            
            sx={{
              px: {
                xs: 2,
                sm: 3,
                direction:"row",
            
            justifyContent:"space-between"
              },
              py: 2,
              borderBottom: "1px solid #eeeeee",
            }}
          >
            <Stack>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  backgroundColor: "#e8f1ff",
                  color: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                   direction:"row", spacing:1.5
                }}
              >
                <Bell size={21} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 20,
                    },
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  Notifications
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#6b7280",
                  }}
                >
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount !== 1 ? "s" : ""
                      }`
                    : "You're all caught up"}
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              startIcon={<CheckCheck size={17} />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                color: "#1976d2",
                minWidth: "auto",
                "& .MuiButton-startIcon": {
                  marginRight: {
                    xs: 0,
                    sm: 0.8,
                  },
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline",
                  },
                }}
              >
                Mark all as read
              </Box>
            </Button>
          </Stack>

          {/* Today */}
          <NotificationSection
            title="Today"
            notifications={notifications.filter(
              (notification) => notification.id <= 4
            )}
            onRead={markAsRead}
          />

          <Divider />

          {/* Earlier */}
          <NotificationSection
            title="Earlier"
            notifications={notifications.filter(
              (notification) => notification.id > 4
            )}
            onRead={markAsRead}
          />
        </Box>
      </Box>
    </Box>

    
  );
}

interface NotificationSectionProps {
  title: string;
  notifications: Notification[];
  onRead: (id: number) => void;
}

function NotificationSection({
  title,
  notifications,
  onRead,
}: NotificationSectionProps) {
  return (
    <Box>
      <Typography
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          pt: 2.5,
          pb: 1,
          fontSize: 13,
          fontWeight: 700,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.4px",
        }}
      >
        {title}
      </Typography>

      <List disablePadding>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={onRead}
          />
        ))}
      </List>
    </Box>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
}

function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  return (
    <ListItem
      onClick={() => onRead(notification.id)}
      sx={{
        position: "relative",
        px: {
          xs: 2,
          sm: 3,
        },
        py: {
          xs: 1.7,
          sm: 2,
        },
        cursor: "pointer",
        backgroundColor: notification.unread
          ? "#f0f7ff"
          : "#ffffff",
        transition: "background-color 0.2s ease",

        "&:hover": {
          backgroundColor: notification.unread
            ? "#e8f3ff"
            : "#f8fafc",
        },
      }}
    >
      {/* Unread dot */}
      {notification.unread && (
        <Box
          sx={{
            position: "absolute",
            left: {
              xs: 7,
              sm: 10,
            },
            top: "50%",
            transform: "translateY(-50%)",
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#1976d2",
          }}
        />
      )}

      <Stack
        
        sx={{
          width: "100%",
          ml: notification.unread ? 0.5 : 0,
          
        direction:"row",
        display:"flex",
        spacing:{
          xs: 1.5,
          sm: 2,
        }
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Avatar
            src={notification.avatar}
            alt={notification.name}
            sx={{
              width: {
                xs: 46,
                sm: 52,
              },
              height: {
                xs: 46,
                sm: 52,
              },
            }}
          />

          {/* Notification Icon */}
          <Box
            sx={{
              position: "absolute",
              right: -4,
              bottom: -4,
              width: 23,
              height: 23,
              borderRadius: "50%",
              backgroundColor: "#1976d2",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #ffffff",
            }}
          >
            {getNotificationIcon(notification.type)}
          </Box>
        </Box>

        {/* Notification Content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13.5,
                sm: 14.5,
              },
              lineHeight: 1.45,
              color: "#1f2937",
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: 700,
              }}
            >
              {notification.name}
            </Box>{" "}
            {notification.message}
          </Typography>

          {notification.username && (
            <Typography
              sx={{
                fontSize: 12,
                color: "#6b7280",
                mt: 0.2,
              }}
            >
              {notification.username}
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: 11.5,
              color: "#9ca3af",
              mt: 0.4,
            }}
          >
            {notification.time}
          </Typography>
        </Box>

        {/* Action Buttons */}
        {notification.action === "follow" && (
          <Button
            variant="contained"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              onRead(notification.id);
            }}
            sx={{
              minWidth: {
                xs: 68,
                sm: 82,
              },
              height: 34,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 12.5,
              boxShadow: "none",
              flexShrink: 0,
            }}
          >
            Follow
          </Button>
        )}

        {notification.action === "accept" && (
          <Button
            variant="contained"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              onRead(notification.id);
            }}
            sx={{
              minWidth: {
                xs: 68,
                sm: 82,
              },
              height: 34,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: 12.5,
              boxShadow: "none",
              flexShrink: 0,
            }}
          >
            Accept
          </Button>
        )}

        {!notification.action && (
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
            }}
            sx={{
              color: "#6b7280",
              flexShrink: 0,
            }}
          >
            <MoreHorizontal size={19} />
          </IconButton>
        )}
      </Stack>
    </ListItem>
  );
}
