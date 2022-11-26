export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
    // 可以直接用的高亮关键词组件 暂时不太懂    
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);
  
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{color: '#257ADF'}}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
