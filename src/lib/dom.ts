export function flash(element: HTMLElement | null): void {
    if (!element) return;
    element.classList.remove('btn-flash');
    void element.offsetWidth;
    element.classList.add('btn-flash');
}
