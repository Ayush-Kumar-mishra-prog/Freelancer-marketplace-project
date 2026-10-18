"use client"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { FaRegThumbsUp } from "react-icons/fa";
import { SiPreact } from "react-icons/si";
import { MdAutoFixHigh } from "react-icons/md";
import { LuConstruction } from "react-icons/lu";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const items = [
  {
    icon: <MdOutlineSettingsSuggest />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <LuConstruction />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond with lasting investment.',
  },
  {
    icon: <FaRegThumbsUp />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <MdAutoFixHigh />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
];

export default function Content() {
  return (
    <>
     <section className="relative hidden overflow-hidden bg-blue-950 lg:block">
              <Image src="/login_hero.webp" alt="" fill priority sizes="50vw" className="object-cover opacity-55" />
              <div className="absolute inset-0 bg-linear-to-br from-blue-950/95 via-blue-900/65 to-slate-900/45" />
              <div className="relative flex h-full min-h-screen flex-col justify-between p-12 xl:p-16">
                <Link href="/" className="flex w-fit items-center gap-2 text-lg font-extrabold tracking-tight text-white no-underline">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500"><Sparkles size={19} /></span>
                  GigSphere
                </Link>
                <div className="max-w-lg pb-12">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-blue-200">A community for good work</p>
                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">Find your people. Make good work happen.</h1>
                  <p className="mt-5 max-w-md text-base leading-7 text-blue-50/80">Meet clients and independent talent who care about doing their best work together.</p>
                  <div className="mt-8 space-y-3">
                    {["Share work and build your reputation", "Find thoughtful projects and collaborators", "Grow at your own pace"].map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm text-blue-50">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15"><Check size={14} /></span>{item}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-blue-100/70">GigSphere · Good work, together.</p>
              </div>
            </section>
    </>
    // <Stack
    //   sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    // >
    //   <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
    //     <SiPreact />
    //   </Box>
    //   {items.map((item, index) => (
    //     <Stack key={index} direction="row" sx={{ gap: 2 }}>
    //       {item.icon}
    //       <div>
    //         <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
    //           {item.title}
    //         </Typography>
    //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //           {item.description}
    //         </Typography>
    //       </div>
    //     </Stack>
    //   ))}
    // </Stack>
  );
}