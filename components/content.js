import React from "react";

export const Content = ({ language, text }) => (
  <div className="text-wrap">
    <div className="text small-text">
      {Object.entries(text[language]).map(([key, Text]) => (
        <Text key={key} />
      ))}
    </div>
  </div>
);
