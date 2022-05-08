export function switchCapsLock(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.remove('hidden');
    span.childNodes[0].classList.add('hidden');
  });
}

export function switcnNonCapsLock(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.add('hidden');
    span.childNodes[0].classList.remove('hidden');
  });
}

export function switchShift(array) {
  array.forEach((span) => {
    span.childNodes[0].classList.add('hidden');
    span.childNodes[1].classList.remove('hidden');
  });
}

export function switchUnshift(array) {
  array.forEach((span) => {
    span.childNodes[0].classList.remove('hidden');
    span.childNodes[1].classList.add('hidden');
  });
}

export function switchShiftCaps(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.add('hidden');
    span.childNodes[3].classList.remove('hidden');
  });
}

export function switchUnshiftCaps(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.remove('hidden');
    span.childNodes[3].classList.add('hidden');
  });
}

export function switchCapsShift(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.add('hidden');
    span.childNodes[3].classList.remove('hidden');
  });
}

export function switchCapsUnshift(array) {
  array.forEach((span) => {
    span.childNodes[2].classList.remove('hidden');
    span.childNodes[3].classList.add('hidden');
  });
}
