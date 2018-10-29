// import EditPrefacePageWrapper from "./edit-preface-page-wrapper";
//
// export default EditPrefacePageWrapper;

import createEditContentPage from 'components/page-edit-content-hoc/edit-content-page-wrapper';

const Page = createEditContentPage('preface', 'Lời nói đầu');
export default Page;
