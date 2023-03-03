export interface Page2Props {
    title?: string;
}

export function Page2({ title = "Page 2" }: Page2Props) {
    return (
        <>
            <h1>{title}</h1>
            <div>Hello from Page2!</div>
        </>
    );
}
