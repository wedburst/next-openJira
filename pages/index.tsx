import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title="Hola Mundo">
      <Typography variant="h1" color="primary">
        Hello Next.js
      </Typography>
    </Layout>
  );
};

export default HomePage;
