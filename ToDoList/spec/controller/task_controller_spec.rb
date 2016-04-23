require 'rails_helper'

RSpec.describe TasksController, type: :controller do

	before :each do
		@task = create(:task)
	end

	describe "GET #index" do 
		it 'renders all tasks' do 
			get :index
			expect(assigns(:tasks)).to eq([@task])
		end
	end

	describe "POST #create" do
		context "with valid params" do
			it "creates a new task" do
				expect{
					post :create, task: attributes_for(:task)
					}.to change(Task,:count).by(1)
			end
		end

		context "with invalid params" do
			it "does not create a new Task" do
				expect{
					post :create, task: attributes_for(:invalid_attributes)
						}.to change(Task, :count).by(0)
			end
		end
	end

	describe 'DELETE destroy' do
		it "deletes the task" do
			expect{
			delete :destroy, id: @task        
			}.to change(Task,:count).by(-1)		
		end
	end

	describe 'PUT update' do
		it "changes @tasks's attributes" do
			put :update, id: @task, 
			task: attributes_for(:task, name: "Task1", completed: true)
			@task.reload
			expect(@task.name).to eq("Task1")
			expect(@task.completed).to eq(true)
		end
	end
end