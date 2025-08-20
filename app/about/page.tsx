"use client";
export default function AboutPage() {
  return (
    <article className="mx-auto" style={{ maxWidth: 820 }}>
      <h1 className="h3 mb-3">About this website</h1>
      <dl className="row">
        <dt className="col-sm-3">Name</dt><dd className="col-sm-9">yanlongyang</dd>
        <dt className="col-sm-3">Student Number</dt><dd className="col-sm-9">22519263</dd>
        <dt className="col-sm-3">Course</dt><dd className="col-sm-9">CSE3CWA / CSE5006</dd>
      </dl>
      <p className="text-body-secondary">This site was built with Next.js + Bootstrap for LTU Assignment.</p>
    </article>
  );
}
