
import React from 'react';

interface HighlightedTextProps {
  text: string;
  keywords: string[];
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, keywords }) => {
  if (!keywords || keywords.length === 0) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isKeyword = keywords.some(keyword => new RegExp(`^${keyword}$`, 'i').test(part));
        if (isKeyword) {
          return (
            <span key={index} className="highlighted-keyword">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

export default HighlightedText;
