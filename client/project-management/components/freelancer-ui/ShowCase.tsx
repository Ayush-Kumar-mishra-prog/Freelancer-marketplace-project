"use client";

import { Avatar, Box, Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { ArrowUpRight, Heart, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { dummyPostType } from "../admin/data/dummypost/dummyPost";

interface ShowCaseProps {
  name: string;
  sortdis: string;
  moredis: string;
  avt: string;
  imag: string;
  nametitle: string;
  date: string;
  projectId: string;
  likes?: number;
}

export default function ShowCase({
  nameOfProject,
  sortDiscription,
  fullDiscription,
  avt,
  image,
  userName,
  date,
  id,
  likes,
  cost,
  status,
  projectLink
}: dummyPostType) {
  const [liked, setLiked] = useState(false);
  const [shareLabel, setShareLabel] = useState("");
  const { checkLogin } = useAuth();
  const router = useRouter();

  const handleLike = () => {
    if (!checkLogin()) {
      router.push("/auth?next=/");
      return;
    }
    setLiked((current) => !current);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/projects/${id}`);
      setShareLabel("Link copied");
      window.setTimeout(() => setShareLabel(""), 1800);
    } catch {
      setShareLabel("Could not copy link");
      window.setTimeout(() => setShareLabel(""), 2400);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        borderRadius: 4,
        bgcolor: "white",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 16px 38px rgba(15, 23, 42, .08)" },
      }}
    >
      <Link href={`/projects/${id}`} className="block">
        <Box sx={{ position: "relative", height: { xs: 190, sm: 205 }, bgcolor: "#eff6ff" }}>
          <Image
            src={image}
            alt={nameOfProject}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <Box sx={{ position: "absolute", left: 14, top: 14, px: 1.3, py: 0.65, borderRadius: 8, bgcolor: "rgba(255,255,255,.94)", color: "#1d4ed8", fontSize: 12, fontWeight: 700 }}>
            Featured work
          </Box>
        </Box>
      </Link>
      <CardContent sx={{ px: 2.5, pt: 2.3, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.8 }}>
          <Avatar sx={{ width: 37, height: 37, bgcolor: "#dbeafe", color: "#1d4ed8", fontSize: 14, fontWeight: 700 }}>{avt}</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: "#0f172a", fontSize: 13, fontWeight: 700 }}>{userName}</Typography>
            <Typography sx={{ color: "#64748b", fontSize: 12 }}>{date}</Typography>
          </Box>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", color: "#64748b", gap: 0.5, fontSize: 12 }}>
            <MapPin size={14} /> Remote
          </Box>
        </Box>
        <Link href={`/projects/${id}`} className="no-underline">
          <Typography component="h3" sx={{ color: "#0f172a", fontWeight: 750, fontSize: 17, lineHeight: 1.35, mb: 0.8, "&:hover": { color: "#2563eb" } }}>
            {nameOfProject}
          </Typography>
        </Link>
        <Typography sx={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.7, minHeight: 46 }}>
          {sortDiscription}
        </Typography>
        <Typography sx={{ mt: 1.4, color: "#2563eb", fontSize: 13, fontWeight: 700 }}>
          {fullDiscription.split(" ").slice(0, 4).join(" ")}...
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2.2, py: 1.4, borderTop: "1px solid #f1f5f9", gap: 0.5 }}>
        <Button
          onClick={handleLike}
          aria-label={liked ? "Unlike project" : "Like project"}
          startIcon={<Heart size={17} fill={liked ? "currentColor" : "none"} />}
          sx={{ color: liked ? "#e11d48" : "#64748b", textTransform: "none", fontSize: 13, fontWeight: 650, minWidth: 0 }}
        >
          {likes}
        </Button>
        <IconButton onClick={handleShare} aria-label={`Share ${userName}`} size="small" sx={{ color: "#64748b", ml: 0.3 }}>
          <Share2 size={17} />
        </IconButton>
        {shareLabel && <Typography role="status" sx={{ color: "#64748b", fontSize: 11 }}>{shareLabel}</Typography>}
        <Button component={Link} href={`/projects/${id}`} endIcon={<ArrowUpRight size={16} />} sx={{ ml: "auto", color: "#2563eb", textTransform: "none", fontWeight: 700, fontSize: 13 }}>
          View project
        </Button>
      </CardActions>
    </Card>
  );
}
