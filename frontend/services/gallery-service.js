const GalleryService = {
    init() {
        this.loadImages();
        this.initFormValidation();
    },

    initFormValidation() {
        $("#addImageForm").validate({
            submitHandler: (form) => {
                this.addImage(form);
            }
        });

        $("#editImageForm").validate({
            submitHandler: (form) => {
                this.editImage(form);
            }
        });
    },

    loadImages() {
        RestClient.get("gallery", (data) => {
            this.displayImages(data);
        });
    },

    displayImages(images) {
        const columns = [
            { data: "image", title: "Image", render: (data) => `<img src="${data}" class="img-thumbnail" style="max-height: 100px;">` },
            { data: "title", title: "Title" },
            { data: "description", title: "Description" },
            {
                data: null,
                title: "Actions",
                render: (data) => `
                    <button class="btn btn-info btn-sm" onclick="GalleryService.viewMore(${data.id})">View More</button>
                    <button class="btn btn-primary btn-sm" onclick="GalleryService.openEditModal(${data.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="GalleryService.openDeleteModal(${data.id})">Delete</button>
                `
            }
        ];

        Utils.datatable("gallery-table", images, columns);
    },

    viewMore(id) {
        RestClient.get(`gallery/${id}`, (data) => {
            window.location.hash = "view_more";
            this.populateViewMore(data);
        });
    },

    populateViewMore(data) {
        $("#image-title").text(data.title);
        $("#image-preview").attr("src", data.image);
        $("#image-description").text(data.description);
    },

    openAddModal() {
        $("#addImageForm")[0].reset();
        $("#addImageModal").modal("show");
    },

    openEditModal(id) {
        RestClient.get(`gallery/${id}`, (data) => {
            $("#edit_image_id").val(data.id);
            $("#edit_title").val(data.title);
            $("#edit_description").val(data.description);
            $("#editImageModal").modal("show");
        });
    },

    openDeleteModal(id) {
        $("#delete_image_id").val(id);
        $("#deleteImageModal").modal("show");
    },

    closeModal() {
        $(".modal").modal("hide");
    },

    addImage(form) {
        const formData = new FormData(form);
        RestClient.post("gallery", formData, (data) => {
            Utils.showSuccess("Image added successfully");
            this.closeModal();
            this.loadImages();
        });
    },

    editImage(form) {
        const formData = new FormData(form);
        const id = formData.get("id");
        RestClient.put(`gallery/${id}`, formData, (data) => {
            Utils.showSuccess("Image updated successfully");
            this.closeModal();
            this.loadImages();
        });
    },

    deleteImage() {
        const id = $("#delete_image_id").val();
        RestClient.delete(`gallery/${id}`, (data) => {
            Utils.showSuccess("Image deleted successfully");
            this.closeModal();
            this.loadImages();
        });
    }
}; 