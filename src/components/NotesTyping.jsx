import TextType from "@/components/TextType";

export default function NotesTyping() {
  return (
    <TextType
      text={[
        "RBAC • Student Management",
        "LocalStorage + SWR",
        "Custom Fields System",
        "Admin & Student Roles",
        "Secure Login & Permissions"
      ]}
      typingSpeed={55}
      deletingSpeed={35}
      pauseDuration={1300}
      variableSpeed={{ min: 40, max: 90 }}
      textColors={["#6366F1", "#0EA5E9", "#EC4899", "#22C55E"]}
      showCursor={false}
      className="text-sm text-gray-700"
    />
  );
}
