//Import Next and its functionality
import Link from "next/link";
import css from "next/css";
//Import our custom CSS variables
import cssVars from "../styles/variables";

//Style the main box
const styles = css({
    "position": "relative",
    "float": "left",
    "width": "48%",
    "height": "10rem",
    "margin": "1%",
    "background": "no-repeat center",
    "backgroundSize": "cover",
    "borderBottom": `${cssVars.primaryColor} 2px solid`,
    "transition": "border-bottom-width 0.1s",
    "borderRadius": "2px",
    "boxShadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)",
    "@media(max-width: 600px)": {
        "width": "98%"
    }
});

//Style the location name
const name = css({
    "position": "absolute",
    "bottom": 0,
    "background": "linear-gradient(bottom, rgba(0, 0, 0, 0.75), transparent)",
    "width": "100%",
    "padding": "1rem 0 0.5rem 0.5rem",
    "color": "white"
});

//Export the component
export default props => (
    //Location box
    <Link href={ `location?id=${ props.location.id }` }>
        <div className={ styles } style={{ backgroundImage: `url(${ props.location.image })` }}>
            <span className={ name }>
                { props.location.name }
            </span>
        </div>
    </Link>
)