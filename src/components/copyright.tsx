"use client";

import { useState, useEffect } from "react";

export function Copyright() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="text-sm text-muted-foreground">
      &copy; {year} Agentomics. All rights reserved.
    </div>
  );
}
