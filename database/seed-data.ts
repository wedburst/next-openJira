interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: lorem10",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En-Progreso lorem10",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Terminadas: lorem10",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
