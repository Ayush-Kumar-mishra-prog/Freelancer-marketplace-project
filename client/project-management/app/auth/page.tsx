import AuthForm from "@/components/freelancer-ui/AuthForm";
import SignIn from "@/components/freelancer-ui/SignIn";
import SignInSide from "@/components/freelancer-ui/SignInSide";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; next?: string }>;
}) {
  const params = await searchParams;
  return <SignInSide disableCustomTheme={params.mode === "custom"} />;
}
