HOW TO USE:
In order to use classes from globals.css, use the syntax:
className="class1"
OR for multiple global classes:
className={`${"class1"} ${"class2"}`}
You do NOT need to import globals.css to use it.

WHEN TO USE GLOBAL CLASSES:
If your CSS class will be reused in multiple components, and contains more than a
couple of properties, put it in globals.css so it can easily be reused.

HOW TO OVERRIDE:
If you need to override one or two properties but still want to use the rest
from a global class, you can use inline CSS. You do NOT need to create a
whole new class or use !important.
Example:
style={{textAlign: "center"}} will override the text-align property from a
className.

HOW TO COMBINE WITH NEXT.JS MODULE CSS:
If you need to use a global class and a module class on the same element, use
this syntax:
import styles from "./YourComponent.module.css";
className={`${styles.class1} ${"class2"}`}
where class1 is a module class and class2 is a global class

HOW TO USE VARIABLES:
To standardize the values used throughout the app, use variables when available.
The variables are defined in styles/global.css, and can be used anywhere in the app.
Example:
background-color: var(--darkgreen);
