"use server";
// get all category
export const allCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`);

  return await res.json();
};

// get category by id
export const getCategoryById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return {
    data: result.data,
  };
};
