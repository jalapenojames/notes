class NotesController < ApplicationController
    def index
        @notes = Note.all

        render json: @notes
    end

    def show
        @note = Note.find(params[:id])

        render json: @note
    end

    def new
        @note = Note.new
    end

    def create
        @note = Note.create(note_params)

        if @note.valid?
            render json: @note
        else
            render json: {error: "Unable to create this note."}
        end
    end

    def update
        @note = Note.find(params[:id])
        @note.update(title: params[:title])
        @note.update(content: params[:content])
    end

    private

    def note_params
        params.require(:note).permit!
    end
end
