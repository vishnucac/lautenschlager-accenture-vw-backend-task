import App from "./App";
import router from "./routes";

const port = process.env.PORT || 3000;
const app = new App(router).express;

app.listen(port, () => {
    console.log(`API is listening on http://localhost:${port}`);
});
