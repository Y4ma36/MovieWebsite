import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
 
}
body{
    color:#f5f6fa;
    background-color : black ;
}

`;

export default GlobalStyles;
