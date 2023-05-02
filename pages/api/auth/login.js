export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).json({ 
      route: "login", 
      method: "post", 
    });
  } else if (req.method !== "GET") {
    res.status(200).json({ 
      route: "login", 
      method: "get", 
    });
  }
};
