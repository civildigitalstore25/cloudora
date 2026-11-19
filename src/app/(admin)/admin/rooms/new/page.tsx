import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { RoomForm } from "@/components/features/admin/RoomForm";

export default function AdminRoomNewPage() {
  return (
    <div>
      <AdminPageHeader
        title="Add room"
        description="Create a bedroom with tariff, floor and amenities."
      />
      <RoomForm />
    </div>
  );
}
