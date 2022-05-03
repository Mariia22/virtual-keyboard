function test() {
  const doc = document.querySelector('body');
  const node = document.createElement('h1');
  node.innerHTML = '1';
  doc.append(node);
}

test();
