import TestComponent from "@/components/test-component";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TestComponent />
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>ManYao Li Personal Website</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>Testing basic functionality...</p>
      </div>
    </div>
  );
}
