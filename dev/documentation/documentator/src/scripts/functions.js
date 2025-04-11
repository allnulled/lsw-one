window.find_documentation_section = function(txt, setFocus = true) {
  const allTitles = Array.from(document.querySelectorAll("h3"));
  for(let index=0; index<allTitles.length; index++) {
    const title = allTitles[index];
    const isMatch = txt.trim() === title.textContent.trim();
    if(isMatch) {
      console.log("MATCH!");
      console.log(title);
      title.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
  }
  return null;
}