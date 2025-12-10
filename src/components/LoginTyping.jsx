import TextType from "@/components/TextType";

export default function LoginTyping() {
  return (
    <div className="text-center md:text-left p-6">
      <TextType
        text={[
          "Welcome to Student RBAC System 👋",
          "Role-Based Access Control",
          "Admin & Student Authentication",
          "Secure Login & Permissions",
          "Fast • Modern • LocalStorage Powered"
        ]}
        typingSpeed={65}
        deletingSpeed={35}
        pauseDuration={1200}
        variableSpeed={{ min: 40, max: 90 }}
        textColors={["#6366F1", "#0EA5E9", "#EC4899", "#22C55E", "#A855F7"]}
        className="text-2xl font-semibold drop-shadow-lg"
        showCursor={true}
        cursorCharacter="|"
      />
    </div>
  );
}
