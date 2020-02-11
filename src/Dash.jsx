import React from "react";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Select from './Select'
import Uppy from "@uppy/core";



//   uppy.use(Dashboard, {
//     id: 'Dashboard',
//     target: 'body',
//     metaFields: [],
//     trigger: '#uppy-select-files',
//     inline: false,
//     width: 750,
//     height: 550,
//     thumbnailWidth: 280,
//     showLinkToFileUploadResult: true,
//     showProgressDetails: false,
//     hideUploadButton: false,
//     hideRetryButton: false,
//     hidePauseResumeButton: false,
//     hideCancelButton: false,
//     hideProgressAfterFinish: false,
//     note: null,
//     closeModalOnClickOutside: false,
//     closeAfterFinish: false,
//     disableStatusBar: false,
//     disableInformer: false,
//     disableThumbnailGenerator: false,
//     disablePageScrollWhenModalOpen: true,
//     animateOpenClose: true,
//     proudlyDisplayPoweredByUppy: true,
//     onRequestCloseModal: () => this.closeModal(),
//     showSelectedFiles: true,
//     browserBackButtonClose: false
//   })

  class Dash extends React.Component {
      constructor(props) {
        super(props);
        this.uppy = new Uppy({
            id: "uppy1",
    debug: true,
    autoProceed: false,
    restrictions: {
      maxNumberOfFiles: 5,
    }
            })
      }
  
    componentWillUnmount() {
      this.uppy.close();
    }
  
    render() {
      return (
        <div>
          <Dashboard uppy={this.uppy}
                showProgressDetails={true}
                hideUploadButton={true}
                allowMultipleUploads={true}
          />
          <Select />
        </div>
      );
    }
  }
  
  export default Dash;