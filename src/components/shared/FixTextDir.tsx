const FixTextDir = ({ text }: { text: string }) => {
  return text.split("\n").map((txt, idx) => (
    <div dir="auto" key={idx}>
      {txt}
    </div>
  ));
};

export default FixTextDir;
