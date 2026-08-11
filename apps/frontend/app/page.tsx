import React from "react";

type Props = {
  children?: React.ReactNode;
};

function News({}: Props) {
  return (
    <div className="min-h-dvh min-w-dvw bg-zinc-600">
      <main className="m-auto flex h-full w-full max-w-10/12 items-center justify-center bg-teal-600">
        <section className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-between px-8 py-4">
            <div className="flex items-center">
              <div className="bg-amber-600 p-2 text-3xl font-medium">TL;DR</div>
              <div className="flex flex-col text-sm">
                <span>Tech News</span>
                <span>Without the noise.</span>
              </div>
            </div>
            <div className="">Search Bar</div>
            <div className="flex">
              <div className="">Dark Mode</div>
              <div className="">Profile</div>
            </div>
          </div>

          <div className="flex flex-1 gap-4 px-12">
            <div className="">AI</div>
            <div className="">Dev</div>
            <div className="">Cloud</div>
            <div className="">Security</div>
            <div className="">Infrastructure</div>
            <div className="">Tools</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default News;
