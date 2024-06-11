export default function getInputValues() {
    const xValue = parseInt(document.getElementById('xAxios').value);
    const yValue = parseInt(document.getElementById('yAxios').value);
    const zValue = parseInt(document.getElementById('axiosZ').value);

    if (xValue < 1 || yValue < 1 || zValue < 1) {
        alert('Please use positive numbers');
        return;
    }

    return { xValue, yValue, zValue };
}
