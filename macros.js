macro greet {
  rule { $x } => {
    document.body.innerHTML = "<h1>Hello, " + $x + "</h1>";
  }
}
export greet;
