import BigCard from "./BigCard";
import UsersInDb from "./UsersInDb";

export default function UsersInDbCard() {
  return (
    <BigCard title="Usuarios en base de datos">
      <UsersInDb />
    </BigCard>
  );
}
