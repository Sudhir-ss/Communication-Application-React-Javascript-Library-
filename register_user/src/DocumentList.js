import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useAsyncError } from "react-router-dom";

const DocumentList = () => {
  const [uploadFileEditData, setuploadFileEditData] = useState([]);
  const [description, setDescription] = useState("");
  const [sharedDocumentData, setsharedDocumentData] = useState({});
  const [editDescription, setEditDescription] = useState("");
  const [sharedToUser, setSharedToUser] = useState({});
  const [file, setFile] = useState(null);
  const [uploadfile, setupload] = useState(null);
  const [filename, setfilename] = useState("");
  const [uploadfileData, setuploadfileData] = useState(
    localStorage.getItem("uploadData")
      ? JSON.parse(localStorage.getItem("uploadData"))
      : []
  );
  const [show, setShow] = useState(false);
  const [showShare, setShareShow] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState({});
  const [showDel, setDelShow] = useState(false);
  const [showRemove, setRemoveShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedUser, setSelectedUser] = useState("");
  const handleEditshow = (data) => {
    // console.log(data);
    const uploadUiData = uploadfileData.filter(
      (upload) => upload.id === data.id
    );
    if (uploadUiData) {
      setEditDescription(data.filename);
    }

    setEditId(data);
    setEditShow(true);
  };
  const handleEditclose = () => setEditShow(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const users = JSON.parse(localStorage.getItem("users"));

  const handledeleteshow = (id) => {
    // console.log("handledelteshow",id)
    setDeleteId(id);

    setDelShow(true);
  };

  const handleRemoveshow = (id) => {
    setRemoveShow(true);
  };
  // console.log("deleteid",deleteId)
  const handledeleteclose = () => setDelShow(false);
  const handleRemoveclose = () => setRemoveShow(false);
  const [updateuploaddData, setuploadUserData] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("uploadData")
      ? JSON.parse(localStorage.getItem("uploadData"))
      : [];
    const loggedInUserel = JSON.parse(localStorage.getItem("loggedInUser"));

    if (storedData.length > 0) {
      let sharedDocumentWithCurrentUser = [];
      storedData.map((val) => {
        if (val.sharedUpload.length > 0) {
          val.sharedUpload.map((itm) => {
            if (itm.sharedTo === loggedInUserel.email) {
              sharedDocumentWithCurrentUser.push(itm);
            }
          });
        }
      });

      setuploadFileEditData([...sharedDocumentWithCurrentUser]);
    }
  }, []);

  useEffect(() => {
    const loggedInUserel = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUserEmail(loggedInUserel.email);
  }, []);

  const handleEditUploadData = (data) => {
    const updateD = uploadfileData.findIndex((u) => u.id == data.id);
    if (updateD != -1) {
      const updatedUploads = [...uploadfileData];
      updatedUploads[updateD].filename = editDescription;
      localStorage.setItem("uploadData", JSON.stringify(updatedUploads));
      setuploadfileData(updatedUploads);
      setEditDescription("");
      setEditId(-1);
      setEditShow(false);
    }
  };
  const handleUpload = () => {
    if (file != "" && description != "") {
      const uploadObj = {
        filename: description,
        uploadfile: file.name,
        id: uuidv4(),
        sharedUpload: [],
      };
      uploadfileData.push(uploadObj);
      localStorage.setItem("uploadData", JSON.stringify(uploadfileData));
      setShow(false);
      setDescription("");
      setFile(null);
    } else {
      alert("Please upload file first");
    }
  };

  const handleDelete = (id) => {
    const uploadUiData = uploadfileData.filter((upload) => upload.id !== id);
    // console.log(uploadUiData)
    setuploadfileData(uploadUiData);

    localStorage.setItem("uploadData", JSON.stringify(uploadUiData));
    setDelShow(false);
  };
  const handleRemoveSharedUser = (sel) => {
    if (sel) {
      let matchIndex = sharedToUser?.sharedUpload.findIndex(
        (val) => val.id === sel
      );

      if (matchIndex > -1) {
        sharedToUser.sharedUpload.splice(matchIndex, 1);
        let selIndex = uploadfileData.findIndex(
          (val) => val.id === sharedToUser?.id
        );

        if (selIndex > -1) {
          uploadfileData[selIndex] = sharedToUser;
          localStorage.setItem("uploadData", JSON.stringify(uploadfileData));
          setuploadfileData([...uploadfileData]);
          handleRemoveclose();
          setSharedToUser({ ...sharedToUser });
        }
      }
    }
  };

  const handleShare = (data) => {
    // console.log(data);
    setsharedDocumentData(data);
    setShareShow(true);
  };

  useEffect(() => {
    setSharedToUser(sharedDocumentData);
  }, [sharedDocumentData]);

  const handleSharedDropUser = () => {
    const [selectedName, selectedEmail] = selectedUser.split(",");
    const filterisvalid = sharedDocumentData.sharedUpload.some(
      (upisvalid) => upisvalid.sharedTo === selectedEmail
    );
    if (filterisvalid) {
      alert("File is already shared with user");
    } else {
      const updatedUploads = uploadfileData.map((u) => {
        if (u.id === sharedDocumentData.id) {
          const updatedUpload = { ...u };
          updatedUpload.sharedUpload.push({
            id: uuidv4(),
            user: selectedName,
            sharedTo: selectedEmail,
            shareBy: loggedInUserEmail,
            filename: sharedDocumentData.filename,
            file: sharedDocumentData.uploadfile,
          });
          return updatedUpload;
        }
        return u;
      });
      localStorage.setItem("uploadData", JSON.stringify(updatedUploads));
      const filterUpdate = updatedUploads.find(
        (upfilter) => upfilter.id === sharedDocumentData.id
      );

      setsharedDocumentData(filterUpdate);
    }
  };

  return (
    <>
      <div
        style={{
          display: showShare ? "none" : "block",
          border: "1px solid black",
        }}
      >
        <div>
          <div>
            <h4 style={{ margin: "10px" }}>My Uploads</h4>
          </div>
          <div style={{ height: "180px", overflow: "auto" }}>
            <table className="table table-striped table-hover table-bordered ">
              <thead>
                <tr>
                  <th className="tabd">Label</th>
                  <th className="tabd">File Name</th>
                  <th className="tabd">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadfileData.length > 0 &&
                  uploadfileData.map((uploaduserData, i) => (
                    <tr key={uploaduserData.id}>
                      <td style={{ width: "33%" }}>
                        {uploaduserData.filename}
                      </td>
                      <td style={{ width: "33%" }}>
                        {uploaduserData.uploadfile}
                      </td>
                      <td style={{ width: "33%" }}>
                        <Button
                          style={{ marginRight: "5px" }}
                          onClick={() => handleEditshow(uploaduserData)}
                        >
                          Edit
                        </Button>
                        {/* <button variant="primary" onClick={() => handleEdit(index)}></button> */}
                        <Button
                          style={{ marginRight: "5px" }}
                          onClick={() => handledeleteshow(uploaduserData.id)}
                        >
                          Delete
                        </Button>
                        <Button onClick={() => handleShare(uploaduserData)}>
                          Share
                        </Button>

                        <Modal show={showDel} onHide={handledeleteclose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm User Deletion</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <FontAwesomeIcon
                              icon={faQuestionCircle}
                              style={{ color: "blue", marginRight: "10px" }}
                            />
                            Are you sure ?
                          </Modal.Body>
                          <Modal.Footer className="foote">
                            <Button
                              className="foot"
                              variant="primary"
                              onClick={() => handleDelete(deleteId)}
                            >
                              Ok
                            </Button>
                            <Button
                              className="foot"
                              variant="primary"
                              onClick={handledeleteclose}
                            >
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        <Modal show={showEdit} onHide={handleEditclose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form className="grid_form">
                              <div className="mb-3 col-lg-12">
                                <div className="form-label widh">
                                  <div className="lab">File Description</div>
                                  <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) =>
                                      setEditDescription(e.target.value)
                                    }
                                    id="description"
                                    name="description"
                                  />
                                </div>
                              </div>
                              <div
                                className="modal_footer"
                                style={{ textAlign: "center" }}
                              >
                                <Button
                                  className="uplo"
                                  variant="primary"
                                  onClick={() => handleEditUploadData(editId)}
                                >
                                  save
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </Modal.Body>
                        </Modal>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div>
            <h4 style={{ margin: "10px" }}>Shared Uploads</h4>
          </div>
          <div style={{ height: "180px", overflow: "auto" }}>
            <table className="table table-striped table-hover table-bordered ">
              <thead>
                <tr>
                  <th className="tabd">Label</th>
                  <th className="tabd">File Name</th>
                  <th className="tabd">Shared By</th>
                </tr>
              </thead>
              <tbody>
                {uploadFileEditData.length > 0 &&
                  uploadFileEditData?.map((sharedData, i) => (
                    <tr key={sharedData.id}>
                      <td style={{ width: "33%" }}>{sharedData.filename}</td>
                      <td style={{ width: "33%" }}>{sharedData.file}</td>
                      <td style={{ width: "33%" }}>{sharedData.shareBy}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleShow}>
            Add Upload
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ marginLeft: "180px" }}>Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="grid_form">
                <div className="mb-3 col-lg-12">
                  <div className="form-label widh">
                    <div className="lab">File Description</div>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      name="description"
                    />
                  </div>
                </div>
                <div className="mb-3 col-lg-12">
                  <div className="form-label widh">
                    <div className="lab">File Upload</div>
                    <input
                      type="file"
                      style={{ width: "62%" }}
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                      }}
                      id="file"
                      name="file"
                    />
                  </div>
                </div>

                <div className="modal_footer" style={{ textAlign: "center" }}>
                  <Button
                    className="uplo"
                    variant="primary"
                    onClick={handleUpload}
                  >
                    Upload Now
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Cancel
                  </Button>
                  {/* <Button onClick={() => setOpenUploadModal(false)}>Cancel</Button> */}
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div style={{ display: showShare ? "block" : "none" }}>
        <div>
          <div>
            <div>
              <h4 style={{ margin: "10px" }}>
                Upload Share: {sharedDocumentData.uploadfile}
              </h4>
            </div>
            <div style={{ height: "180px", overflow: "auto" }}>
              <table className="table table-striped table-hover table-bordered ">
                <thead>
                  <tr>
                    <th className="tabd">Label</th>
                    <th className="tabd">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sharedToUser &&
                    sharedToUser?.sharedUpload?.map((sharedData, i) => (
                      <tr>
                        <td style={{ width: "33%" }}>{sharedData.user}</td>
                        <td style={{ width: "33%" }}>
                          <Button
                            style={{ marginRight: "5px" }}
                            onClick={() => handleRemoveshow(sharedData.id)}
                          >
                            Remove
                          </Button>

                          <Modal show={showRemove} onHide={handleRemoveclose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Confirm User Deletion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{ color: "blue", marginRight: "10px" }}
                              />
                              Are you sure ?
                            </Modal.Body>
                            <Modal.Footer className="foote">
                              <Button
                                className="foot"
                                variant="primary"
                                onClick={() =>
                                  handleRemoveSharedUser(sharedData.id)
                                }
                              >
                                Ok
                              </Button>
                              <Button
                                className="foot"
                                variant="primary"
                                onClick={handleRemoveclose}
                              >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h4 style={{ margin: "10px" }}>Add Share:</h4>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <Form.Select
                  onChange={(e) => setSelectedUser(e.target.value)}
                  value={selectedUser}
                  style={{ width: "300px" }}
                  aria-label="Default select example"
                >
                  <option>Open this select menu</option>
                  {users &&
                    users.map((user) => (
                      <option value={`${user.name},${user.email}`}>
                        {user.name}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <div>
                <Button
                  style={{ marginLeft: "35px" }}
                  onClick={() => handleSharedDropUser()}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentList;
