export const extractDateAndTime = (publication_date: Date) => {
  if (!publication_date) {
    return '';
  }

  return new Date(publication_date).toDateString() + ', ' + new Date(publication_date).toTimeString().slice(0, 5);
};
