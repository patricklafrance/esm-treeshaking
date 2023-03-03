import { Page2 } from "package-5";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { isNotUndefined } from "package-4";

console.log(isNotUndefined(1));

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Page2 />
    </StrictMode>
);
