// Placeholder for Card component
export function Card({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function CardHeader({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }) {
  return <h2 {...props}>{children}</h2>;
}

export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}