export interface Page1Props {
    title?: string;
}

export function Page1({ title = "Page 1" }: Page1Props) {
    return (
        <>
            <h1>{title}</h1>
            <div>Hello from Page1!</div>
        </>
    );
}
