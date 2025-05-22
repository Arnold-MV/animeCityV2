import { NextApiRequest, NextApiResponse } from "next";

const ANILIST_API_URL = "https://graphql.anilist.co";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query;

  try {
    const response = await fetch(ANILIST_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Error al obtener datos de AniList" });
  }
};

export default handler;
