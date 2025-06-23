import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import ProgressChart from "../components/ProgressChart";

export default function Home() {
  return (
    <div>
      <h1>EcoGoals Dashboard</h1>
      <HabitForm />
      <HabitList />
      <ProgressChart />
    </div>
  );
}
