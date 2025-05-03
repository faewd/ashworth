"use client"

import Alert from "@/lib/components/Alert";
import Button from "@/lib/components/Button";
import Heading from "@/lib/components/Heading";
import Spinner from "@/lib/components/Spinner";


export default function ComponentsPage() {
  return (
    <main className="p-4">
      <Heading rank={1}>Component Library</Heading>
      <section className="mt-4 pt-4 border-t-2 border-zinc-600">
        <Heading rank={2} className="mb-4">Headings</Heading>
        
        <Heading rank={1}>Heading 1</Heading>
        <Heading rank={2}>Heading 2</Heading>
        <Heading rank={3}>Heading 3</Heading>
        <Heading rank={4}>Heading 4</Heading>
        <Heading rank={5}>Heading 5</Heading>
        <Heading rank={6}>Heading 6</Heading>
      </section>
      <section className="mt-4 pt-4 border-t-2 border-zinc-600">
        <Heading rank={2} className="mb-4">Buttons</Heading>
        
        <div className="flex gap-8">
          <div>
            <Heading rank={3} className="mb-2">Solid</Heading>
            <div className="grid grid-cols-[repeat(3,_min-content)] gap-2">
              <Button onClick={() => {}}>Primary</Button>
              <Button onClick={() => {}} color="secondary">Secondary</Button>
              <Button onClick={() => {}} color="error">Error</Button>
              <Button onClick={() => {}} color="warn">Warn</Button>
              <Button onClick={() => {}} color="success">Success</Button>
              <Button onClick={() => {}} color="info">Info</Button>
              <Button onClick={() => {}} disabled>Disabled</Button>
            </div>
          </div>
          <div>
            <Heading rank={3} className="mb-2">Ghost</Heading>
            <div className="grid grid-cols-[repeat(3,_min-content)] gap-2">
              <Button onClick={() => {}} ghost>Primary</Button>
              <Button onClick={() => {}} ghost color="secondary">Secondary</Button>
              <Button onClick={() => {}} ghost color="error">Error</Button>
              <Button onClick={() => {}} ghost color="warn">Warn</Button>
              <Button onClick={() => {}} ghost color="success">Success</Button>
              <Button onClick={() => {}} ghost color="info">Info</Button>
              <Button onClick={() => {}} ghost disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-4 pt-4 border-t-2 border-zinc-600">
        <Heading rank={2} className="mb-4">Spinners</Heading>
        <div className="flex gap-4">
          <Spinner color="primary" />
          <Spinner color="secondary" />
          <Spinner color="error" />
          <Spinner color="warn" />
          <Spinner color="success" />
          <Spinner color="info" />
        </div>
      </section>
      <section className="mt-4 pt-4 border-t-2 border-zinc-600">
        <Heading rank={2} className="mb-4">Alerts</Heading>
        <div>
          <Alert color="primary" className="mb-2">Primary</Alert>
          <Alert color="secondary" className="mb-2">Secondary</Alert>
          <Alert color="error" className="mb-2">Error</Alert>
          <Alert color="warn" className="mb-2">Warn</Alert>
          <Alert color="success" className="mb-2">Success</Alert>
          <Alert color="info" className="mb-2">Info</Alert>
        </div>
      </section>

    </main>
  )
}