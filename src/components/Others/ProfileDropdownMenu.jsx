import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@heroui/dropdown";
import { BookText, CircleUserRound, LogOut, NotebookPen, Settings } from "lucide-react"

export function ProfileDropdownMenu({children, setModalOpen}) {
  const handleLinkClick = (href) => {
    // Navigate to the href
    window.location.href = href;
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {children}
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Profile Actions"
        variant="faded"
        className="w-56"
        classNames={{
          base: "bg-white shadow-xl border border-gray-200 rounded-lg",
          list: "bg-white p-2",
          item: "hover:bg-gray-100 rounded-md transition-colors duration-200",
          section: "mb-2",
          sectionTitle: "text-[10px] font-medium text-gray-500 uppercase tracking-wider px-3 py-1 mb-1",
        }}
        alignment="end"
      >
        <DropdownSection title="My Account" showDivider>
          <DropdownItem
            key="profile"
            startContent={<CircleUserRound size={16} className="text-gray-600" />}
            onPress={() => handleLinkClick('/profile')}
            className="py-2 px-3 mt-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="my-blogs"
            startContent={<BookText size={16} className="text-gray-600" />}
            onPress={() => handleLinkClick('/my-blogs')}
            className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors"
          >
            My Blogs
          </DropdownItem>
          <DropdownItem
            key="create-blog"
            startContent={<NotebookPen size={16} className="text-gray-600" />}
            onPress={() => handleLinkClick('/create-blog')}
            className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors"
          >
            Create Blog
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<Settings size={16} className="text-gray-600" />}
            onPress={() => handleLinkClick('/settings')}
            className="py-2 px-3 hover:bg-gray-100 rounded-md transition-colors"
          >
            Settings
          </DropdownItem>
        </DropdownSection>
        
        <DropdownSection title="Actions">
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<LogOut size={16} />}
            onPress={() => {
              if (setModalOpen) {
                setModalOpen(true);
              }
            }}
            className="py-2 px-3 mt-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}