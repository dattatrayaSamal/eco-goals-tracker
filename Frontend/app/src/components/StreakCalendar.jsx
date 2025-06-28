import dayjs from "dayjs";

export default function StreakCalendar({ habits = [] }) {
  const renderStreakDays = (streaks) => {
    const today = dayjs();
    const dates = streaks.map((s) => dayjs(s).format("YYYY-MM-DD"));

    return [...Array(7)]
      .map((_, i) => {
        const day = today.subtract(i, "day").format("YYYY-MM-DD");
        const active = dates.includes(day);
        const weekdayLetter = dayjs(day).format("dd")[0]; // e.g. "M" for Monday

        return (
          <div
            key={i}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
              active
                ? "bg-green-500 text-white shadow-md hover:scale-105"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            title={dayjs(day).format("MMM D, YYYY")}
          >
            {weekdayLetter}
          </div>
        );
      })
      .reverse();
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md transition-all duration-300 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6 border-b pb-2">
        Weekly Streaks
      </h2>

      {habits.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          Track some habits to see your streaks!
        </p>
      ) : (
        <div className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {habit.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {habit.streaks.length} day{habit.streaks.length !== 1 && "s"}{" "}
                  streak
                </span>
              </div>

              <div className="flex justify-center sm:justify-start flex-wrap">
                {renderStreakDays(habit.streaks.map((s) => s.date))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
