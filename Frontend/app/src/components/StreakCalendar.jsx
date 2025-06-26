import dayjs from "dayjs";

export default function StreakCalendar({ habits = [] }) {
  const renderStreakDays = (streaks) => {
    const today = dayjs();
    const dates = streaks.map((s) => dayjs(s).format("YYYY-MM-DD"));

    return [...Array(7)]
      .map((_, i) => {
        const day = today.subtract(i, "day").format("YYYY-MM-DD");
        const active = dates.includes(day);
        return (
          <div
            key={i}
            className={`w-8 h-8 m-1 flex items-center justify-center rounded-full ${
              active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
            }`}
            title={dayjs(day).format("MMM D, YYYY")}
          >
            {dayjs(day).format("dd")[0]}
          </div>
        );
      })
      .reverse();
  };

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        Weekly Streaks
      </h2>
      {habits.length === 0 ? (
        <p className="text-gray-500">Track some habits to see your streaks!</p>
      ) : (
        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit._id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{habit.title}</h3>
                <span className="text-sm text-gray-500">
                  {habit.streaks.length} day streak
                </span>
              </div>
              <div className="flex justify-center">
                {renderStreakDays(habit.streaks.map((s) => s.date))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
