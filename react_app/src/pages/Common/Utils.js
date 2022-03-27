export const toogle = (settter) => {
    settter(prevState => (
        prevState ? false : true
    ));
}